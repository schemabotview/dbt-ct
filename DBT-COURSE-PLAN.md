# dbt — From a First Model to Reliable Analytics Engineering

## Audience and prerequisites

For learners new to dbt who understand SQL SELECT, JOIN, GROUP BY, and basic relational tables. Basic file and terminal familiarity is helpful. Introduce YAML, Jinja, and Git locally; Python is optional. Use companion SQL and warehouse plans for deeper prerequisites.

Scope: projects, sources, models, materializations, tests, documentation, reusable compilation, incremental processing, snapshots, selective execution, deployment, operations, and metric-definition boundaries. This course is independent of certifications. Use annotated SQL/YAML/Jinja, compiled SQL, expected and failing rows, DAGs, artefact excerpts, and failure timelines. No paid platform, submitted exercises, or monitored assessments are required; following examples is optional.

Reference surface: official dbt documentation researched on **2026-10-12**. Use a **dbt Core CLI, SQL-first workflow** as the primary illustration and Snowflake as the consistent warehouse example. Pin compatible engine/CLI, adapter, package, and warehouse versions when lessons are authored. Current documentation spans multiple release tracks and engines; do not assume feature or behaviour parity. Hosted-platform, Fusion-specific, Python, and Semantic Layer capabilities require separate eligibility checks. Core teaching does not depend on previews or paid services.

Target: understand how to construct and explain tested, documented analytical models, interpret build evidence, and justify incremental, deployment, and operational decisions. Completion does not establish assessed production competence.

Structure: **10 chapters**, with **6, 8, 7, 8, 8, 8, 8, 8, 7, and 5 sections**. Counts follow conceptual weight rather than quotas or equal teaching duration.

## Learning spine

Follow SQL into a first dbt build → organise sources and dependencies → design useful analytical products → establish quality and interfaces → introduce reusable compilation → handle incremental changes and history → select and optimise runs → deploy collaboratively → operate and evolve.

Recurring example: raw orders, payments, and customer changes become trusted staging models, analytical marts, and revenue definitions. A correct full rebuild establishes the baseline before incremental optimisation. Introduce a small test and model description with the first model; deepen quality design later. Layer names are useful organisational patterns, not mandatory architecture or proof of correctness.

Teaching method: objective → mental model → annotated model/configuration and compiled SQL → expected rows or diagnostic evidence → alternative/failure contrast → outcome → bridge. Explain warehouse execution separately from dbt compilation and orchestration. Tests are engineering techniques taught through examples, not required learner assessments.

## Chapter 1 — Analytics Engineering and a First Build

Objective: Explain how dbt turns a model into warehouse work and follow a small model from source SQL to result.

1. Analytics engineering, ELT, and transformation versus ingestion responsibilities
2. Engine, adapter, warehouse, and hosted-platform boundaries
3. Project setup, connection profile, target environment, and credentials
4. SQL models, configuration, ref, and a first dependency
5. parse, compile, run, build, and test: different operations and effects
6. First results, basic tests/descriptions, artefacts, and cost awareness

Worked illustrations: Raw order rows, a SQL model, compiled SQL, and expected output; a small YAML test/description; a CLI workflow and created-relation diagram. Explain that dbt generally delegates SQL execution to the warehouse, a successful run is not proof of business correctness, and compilation-related macros can perform database work. Keep credentials outside committed project files and label illustrative output.

Outcome: Interpret a first model and build sequence, distinguish compilation from execution, and identify the evidence needed to explain its result.

Bridge: One model needs clear inputs and dependencies; next we organise the project around them.

## Chapter 2 — Sources, Dependencies, and Project Organisation

Objective: Explain how source declarations and model references make dependencies and ownership visible.

1. Project layout, dbt_project.yml, properties files, and configuration precedence
2. Source declarations, source references, and raw-data ownership
3. Source freshness, loaded-at evidence, and completeness boundaries
4. ref, DAG dependencies, relation resolution, and naming
5. Seeds and bounded reference data versus ingestion pipelines
6. Staging, intermediate, and mart organisation as design patterns
7. Targets, schemas, aliases, and environment isolation
8. Documentation, ownership, lineage, and source contracts

Worked illustrations: Source YAML; source() and ref() compiled into relations; a dependency graph; a stale-source case; a small reference seed. Distinguish declaring a source from creating or loading it. Explain why recent loaded-at values do not prove every expected record arrived, and why development schema naming needs review before shared-warehouse use. Use source contracts as upstream agreements, distinct from dbt model-contract features.

Outcome: Explain a model's inputs and dependency path, interpret freshness evidence, and justify a project/environment layout.

Bridge: Dependency structure does not establish analytical meaning; next we define model grain and serving choices.

## Chapter 3 — Analytical Models and Materialization Choices

Objective: Design models with explicit business meaning and select persistence according to workload needs.

1. Grain, keys, joins, aggregation, and duplicate amplification
2. Facts, dimensions, business definitions, and consumer requirements
3. Temporal semantics and current versus historical attributes
4. Views, tables, and ephemeral models
5. Warehouse-managed materializations and adapter-specific refresh choices
6. Configuration, execution costs, and adapter boundaries
7. Consumer-facing model interfaces and compatibility

Worked illustrations: Orders joined to payments at mismatched grain; corrected output; a dimension/fact sketch; the same SQL as view, table, and ephemeral model. Explain that ephemeral models compile into dependants rather than create directly queryable relations. Compare warehouse-managed refresh with dbt-scheduled rebuilds, checking adapter support rather than treating materialized views and Snowflake dynamic tables as universal equivalents.

Outcome: Explain an analytical model's grain and history assumptions, compare materialization choices, and identify interface changes that can affect consumers.

Bridge: Useful models need explicit evidence and stable expectations; next we deepen quality, documentation, and contracts.

## Chapter 4 — Tests, Documentation, and Model Contracts

Objective: Distinguish data checks, logic tests, structural guarantees, and documentation by what they establish.

1. Generic data tests: uniqueness, nullability, relationships, and accepted values
2. Singular tests and business-specific failing-row queries
3. Severity, thresholds, stored failures, and build failure/skip behaviour
4. Unit tests, fixtures, mocks, edge cases, and eligibility
5. Documentation, lineage, exposures, and consumer discovery
6. Model contracts, column types, and warehouse constraint enforcement
7. Model versions, access, deprecation, and consumer migration
8. Quality coverage, false confidence, and untested business assumptions

Worked illustrations: YAML generic tests and returned failing rows; a fixture-based unit test with expected output; an incompatible column/type change; two model versions and their references. Separate tests over existing data from unit tests of transformation logic. Contracts describe supported model shape, not complete business correctness; constraints differ by warehouse, adapter, and materialization. Model access governs dbt references and is not a substitute for warehouse permissions.

Outcome: Interpret quality evidence, choose checks for stated risks, and explain what a test or contract does and does not guarantee.

Bridge: Concrete models and checks are established; next we reduce repetition without hiding their meaning.

## Chapter 5 — Jinja, Macros, and Reusable Compilation

Objective: Explain generated SQL and choose abstractions that remain understandable and predictable.

1. Parsing, compilation, execution, and the Jinja context
2. Variables, control flow, loops, and SQL string generation
3. Macros, arguments, return values, and reusable SQL patterns
4. ref/source visibility and dependency discovery
5. Packages, dependency specifications, locks, and provenance
6. Dispatch and adapter-specific implementations
7. Hooks, operations, run_query, execute guards, and side effects
8. Python model selection and supported execution boundaries

Worked illustrations: Repeated SQL replaced by a small macro; inputs mapped to compiled SQL; a package dependency sketch; a macro that queries metadata; a missing dependency caused by hidden ref usage. Explain that execute guards address parse-time evaluation but do not make commands side-effect-free. Prefer transparent generated SQL over excessive abstraction. Python models run through supported warehouse/adapter mechanisms, not as unrestricted local scripts; their materializations and feature support differ from SQL models.

Outcome: Interpret a macro's compiled result, explain compile-time versus database effects, and judge whether reuse improves maintainability.

Bridge: Reusable transformations now need to handle persistent change; next we establish incremental and historical-state correctness.

## Chapter 6 — Incremental Models and Historical State

Objective: Explain how persistent models handle new and changed records without losing the full-rebuild correctness baseline.

1. Full rebuilds, existing targets, and is_incremental conditions
2. Source filters, watermarks, and incremental processing boundaries
3. unique_key, strategies, and adapter-specific update behaviour
4. Late data, lookback windows, deduplication, and deterministic input
5. Updates, deletes, schema changes, and historical-column backfills
6. Full refresh, targeted backfills, reconciliation, and recovery
7. Snapshots, SCD history, timestamp/check strategies, and observed changes
8. Snapshot frequency, hard-delete options, retention, and rebuild limits

Worked illustrations: Initial/full and later incremental SQL paths; before/after batches; a late row missed by a maximum timestamp; duplicate source keys; a snapshot interval timeline. unique_key is configuration for supported matching behaviour, not a uniqueness test or source-data constraint. on_schema_change does not automatically recompute all historical values. Snapshots record what runs observe and cannot reconstruct every unobserved intermediate source change; recreating a snapshot may lose history unavailable upstream.

Outcome: Explain an incremental or snapshot sequence, identify missed-change risks, and justify backfill/rebuild decisions with explicit source and retention assumptions.

Bridge: Persistent state makes unnecessary rebuilding costly; next we select runs and interpret execution evidence carefully.

## Chapter 7 — Selection, Artefacts, and Efficient Execution

Objective: Explain what will run, which upstream relations it will use, and what artefacts can establish afterwards.

1. Graph operators, set selection, exclusions, and YAML selectors
2. Selected resources, indirect test selection, and build ordering
3. manifest, run_results, catalog, and freshness artefact boundaries
4. State comparison and modified-resource selection
5. Deferral, existing relations, upstream resolution, and favour-state choices
6. Threads, concurrency, warehouse queues, and cost
7. Compiled SQL, materializations, and query-performance evidence
8. Partial failures, retry commands, and engine/version support

Worked illustrations: Selected DAGs; manifest/run-results excerpts; a changed macro affecting downstream models; a deferred production upstream relation; warehouse queue versus compilation time. Explain that comparison artefacts describe project state, not an authoritative record of current warehouse contents. Preserve comparison manifests separately from the current output path. Deferral can mix environments and does not ensure upstream freshness; relation resolution depends on selection, existence, and flags.

Outcome: Interpret a selected/deferred execution, explain its evidence and cost, and identify assumptions that invalidate a selective-build claim.

Bridge: Efficient selection supports CI; next we place it inside a trusted deployment workflow.

## Chapter 8 — Deployment, Collaboration, and Governance

Objective: Explain how reviewed project changes become production work with controlled identities and dependencies.

1. Git, pull requests, ownership, and reviewable SQL/configuration
2. Development and CI targets, isolated schemas, and cleanup
3. Slim CI, state artefact provenance, deferral, and test-data limits
4. Deployment identities, secrets, warehouse grants, and least privilege
5. Orchestration, ingestion dependencies, freshness checks, and schedules
6. Release ordering, compatible schemas, versions, and consumer handoff
7. Hosted dbt platform versus external CLI orchestration
8. Packages, multi-project dependencies, and governance boundaries

Worked illustrations: Change → checks → CI build → reviewed deployment sequence; a stale comparison manifest; a production job waiting for source readiness; separate developer/CI/production identities. Explain why CI success against old upstream relations does not prove production freshness or production-scale performance. Distinguish project/package dependencies from hosted cross-project resolution features and label availability. Paid hosting is optional; source ingestion and external orchestration remain explicit responsibilities.

Outcome: Explain a deployment path, identify trust/isolation gaps, and justify orchestration and identity choices under stated requirements.

Bridge: Successful deployment does not remove ongoing failures; next we diagnose and evolve the product safely.

## Chapter 9 — Operations and Safe Evolution

Objective: Explain operational failure and recovery using project artefacts, warehouse evidence, and business reconciliation.

1. Run, source-freshness, test, and consumer-health monitoring
2. Logs, compiled SQL, artefacts, and warehouse diagnosis
3. Partial builds, side effects, retries, and idempotency boundaries
4. Failed incremental recovery, backfills, and historical reconciliation
5. Schema, model, package, adapter, and engine upgrades
6. Performance/cost regression and workload prioritisation
7. Ownership, retention, audit evidence, and incident runbooks

Worked illustrations: Upstream success followed by a failed mart; a missing watermark range; a recovery build with reconciled totals; a package upgrade changing generated SQL; a model passing tests but violating a consumer definition. Explain that a project build is not universally one transaction and code rollback does not restore prior data. Diagnose database state before choosing retry or full refresh; preserve snapshot history and required artefacts.

Outcome: Explain a failure/recovery sequence, compare repair options, and identify additional evidence needed before claiming the product is healthy.

Bridge: Reliable models still need consistent shared meaning; next we integrate metric definitions and architecture decisions.

## Chapter 10 — Metrics, Integrated Design, and Continuation

Objective: Explain a coherent analytics product and decide where shared metric definitions add value.

1. Shared business definitions and Semantic Layer selection boundaries
2. Entities, measures, dimensions, grain, and join risks
3. End-to-end alternatives for modelling, persistence, and orchestration
4. Migration, consumer compatibility, and architecture decision records
5. Specialist continuation and priorities for improvement

Worked illustrations: Two reports disagreeing on revenue; a model-to-metric graph; retail-product architecture alternatives; a decision record comparing full rebuild and incremental operation. Explain metric modelling separately from hosted serving/BI integration, with engine, product, and adapter eligibility checked. Defining a metric does not automatically resolve source quality, join fan-out, or conflicting business ownership.

Outcome: Present and critique a dbt data-product design, trace its data and dependencies, and justify model, quality, execution, and metric choices.

Bridge: Continue through optional implementation, current adapter/engine documentation, peer-reviewed changes, and operational practice. Production responsibility requires demonstrated modelling, deployment, and recovery competence beyond following worked explanations.

## Sources and scope

Official conceptual/reference sources inspected on 2026-10-12:

- [Introduction](https://docs.getdbt.com/docs/introduction), [versions](https://docs.getdbt.com/docs/dbt-versions), [models](https://docs.getdbt.com/docs/build/models), [sources](https://docs.getdbt.com/docs/build/sources), [freshness](https://docs.getdbt.com/reference/resource-configs/freshness), and [materializations](https://docs.getdbt.com/docs/build/materializations).
- [Data tests](https://docs.getdbt.com/docs/build/data-tests), [unit tests](https://docs.getdbt.com/docs/build/unit-tests), [contracts](https://docs.getdbt.com/docs/mesh/govern/model-contracts), [model versions](https://docs.getdbt.com/docs/mesh/govern/model-versions), and [build](https://docs.getdbt.com/reference/commands/build).
- [Jinja/macros](https://docs.getdbt.com/docs/build/jinja-macros), [execute context](https://docs.getdbt.com/reference/dbt-jinja-functions/execute), [Python models](https://docs.getdbt.com/docs/build/python-models), [incremental models](https://docs.getdbt.com/docs/build/incremental-models), and [snapshots](https://docs.getdbt.com/docs/build/snapshots).
- [Selection](https://docs.getdbt.com/reference/node-selection/syntax), [artefacts](https://docs.getdbt.com/reference/artifacts/dbt-artifacts), [state caveats](https://docs.getdbt.com/reference/node-selection/state-comparison-caveats), [deferral](https://docs.getdbt.com/reference/node-selection/defer), and [semantic models](https://docs.getdbt.com/docs/build/semantic-models).

Book comparison: Rui Pedro Machado and Helder Russa's [Analytics Engineering with SQL and dbt](https://www.oreilly.com/library/view/analytics-engineering-with/9781098142377/) was inspected through publisher description and exposed contents. Roberto Zagni's [Data Engineering with dbt](https://www.packtpub.com/en-se/product/data-engineering-with-dbt-9781803241883) was accessible only through a publisher search-result description; direct retrieval returned 403. No full books were accessed. Current primary documentation governs technical claims; book comparison remains limited. Detailed research, gaps, and coverage mapping are in [README.md](../README.md).

Boundaries: full source ingestion, deep warehouse administration, custom adapters/materializations, every package, full MetricFlow/Semantic Layer administration, enterprise Mesh, and hosted-platform administration are deferred. Python and alternative engines receive bounded comparisons. Snowflake-specific behaviour must be labelled rather than presented as portable dbt semantics.

This is a teaching plan, not completed lessons or executed builds. Detailed SQL, YAML/Jinja syntax, authentication, command flags, test behaviour, feature eligibility, and package/adapter compatibility require checks against the pinned implementation when lessons are authored.
